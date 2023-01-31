import { DIET_PACKAGES } from './dietPackages'
import { PLANS } from './plansData'
import { DietPackageType, PlansType } from './types'
// import axios from 'axios';

// export default axios.create({
//   baseURL: 'http://localhost:3001'
// });

export const getPlans = (): Promise<PlansType[]> => {
  return new Promise((resolve, reject) => {
    try {
      resolve(PLANS)
    } catch (error) {
      reject({ error })
    }
  })
}

export const getDietPackages = (): Promise<DietPackageType[]> => {
  return new Promise((resolve, reject) => {
    try {
      resolve(DIET_PACKAGES)
    } catch (error) {
      reject({ error })
    }
  })
}

export const savePackage = (data: Partial<DietPackageType>): Promise<DietPackageType> => {
  return new Promise((resolve, reject) => {
    try {
      const packageData: DietPackageType = {
        ...data as DietPackageType,
        id: DIET_PACKAGES.length + 1
      }
      DIET_PACKAGES.push(packageData);
      resolve(packageData);
    } catch (error) {
      reject({ error })
    }
  })
}