export type PlansType = {
  id: number,
  name: string,
  type: string,
  howItWork: string,
  benefits: string,
  downsides: string,
  summary: string,
}

export type DietPackageType = {
  id: number,
  name: string,
  image: string,
  planId: number
}