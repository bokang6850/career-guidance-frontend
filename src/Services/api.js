import { 
  firestore, 
  firebaseStorage, 
  firebaseAuth, 
  COLLECTIONS, 
  utils 
} from './firebase';

// Base API class
class API {
  constructor() {
    this.collections = COLLECTIONS;
  }

  handleError(error) {
    console.error('API Error:', error);
    return { success: false, error: error?.message || 'An error occurred' };
  }

  async uploadFile(file, folder) {
    try {
      const path = `${folder}/${utils.generateId()}_${file.name}`;
      return await firebaseStorage.upload(file, path); // Make sure this resolves to { success, url }
    } catch (error) {
      return this.handleError(error);
    }
  }
}

// Auth API
export class AuthAPI extends API {
  async register(userType, data) {
    try {
      const { email, password, ...userData } = data;

      const authResult = await firebaseAuth.register(email, password, userData);
      if (!authResult.success) return authResult;

      const userId = authResult.user.uid;

      const userProfile = {
        ...userData,
        email,
        userType,
        emailVerified: false,
        isActive: true,
        lastLogin: null,
      };

      const profileResult = await firestore.create(this.collections.USERS, userId, userProfile);
      if (!profileResult.success) return profileResult;

      // Create specific profile
      if (userType === 'student') await this.createStudentProfile(userId, userData);
      if (userType === 'institution') await this.createInstitutionProfile(userId, userData);
      if (userType === 'company') await this.createCompanyProfile(userId, userData);

      return { success: true, userId };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async login(email, password) {
    try {
      const authResult = await firebaseAuth.login(email, password);
      if (!authResult.success) return authResult;

      const userProfile = await firestore.read(this.collections.USERS, authResult.user.uid);
      if (!userProfile.success) return userProfile;

      await firestore.update(this.collections.USERS, authResult.user.uid, { lastLogin: new Date() });

      return { success: true, user: { id: authResult.user.uid, email, ...userProfile.data } };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async logout() {
    return await firebaseAuth.logout();
  }

  async resetPassword(email) {
    return await firebaseAuth.resetPassword(email);
  }

  // Profile creation methods...
}

// Other API classes (StudentAPI, InstitutionAPI, CompanyAPI, AdminAPI)
// Follow the same pattern: wrap all async calls in try/catch, return { success, data/error }

export const authAPI = new AuthAPI();
// Similarly instantiate others: studentAPI, institutionAPI, companyAPI, adminAPI
export default { auth: authAPI };
