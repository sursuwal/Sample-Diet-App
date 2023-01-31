
import React, { useReducer } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Box, Grid } from '@mui/material'
import { ButtonControl, StringInput } from '../../components/controls'
import { CardComponent } from '../../components/'
import CreatePackage from './CreatePackage'
import ViewPackage from './ViewPackage'
import { DietPackageType, PlansType } from '../../services/types'
import { getDietPackages, getPlans } from '../../services/api'

export const PackagesPage = () => {
  const [dietPackages, setDietPackages] = useState<DietPackageType[]>([])
  const [search, setSearch] = useState('')
  const [showCreatePackage, setShowCreatePackage] = useReducer(
    (showCreatePackage) => !showCreatePackage, false
  )
  const [showViewPackage, setShowViewPackage] = useReducer(
    (showViewPackage) => !showViewPackage, false
  )
  const [selectedPackage, setSelectedPackage] = useState<DietPackageType>()
  const [plans, setPlans] = useState<PlansType[]>([])

  // return filtered data
  const getDietPackagesData = () => {
    if (!search) {
      return dietPackages
    }

    return dietPackages.filter((dietPackage: DietPackageType) => dietPackage.name.toLowerCase().includes(search.toLowerCase()))
  }

  const handlePackageSelection = (dietPackage: DietPackageType) => {
    setSelectedPackage(dietPackage)
    setShowViewPackage()
  }

  const getSelectedPlan = () => {
    return plans.find(plan => plan.id === selectedPackage?.planId)
  }

  // all the useEffects
  useEffect(() => {
    (async () => {
      try {
        if (!showCreatePackage) {
          const dietPackagesData = await getDietPackages()
          setDietPackages(dietPackagesData)
        }
      } catch (e) { }
    })()
  }, [showCreatePackage])

  // get plans when component loads
  useEffect(() => {
    (async () => {
      try {
        const plansData = await getPlans()
        setPlans(plansData)
      } catch (e) { }
    })()

  }, [])

  return <Box>
    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box style={{ marginRight: 2, width: 'auto', flex: 2 }}>
        <StringInput
          id={'search'}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder='Search Diet Packages'
          dataTestId='search'
        />
      </Box>

      <ButtonControl
        title='Add New'
        onClick={() => setShowCreatePackage()}
      />
    </Box>

    <Grid container spacing={2} mt={2}>
      {getDietPackagesData().length > 0 && getDietPackagesData().map((dietPackage: DietPackageType) => {
        return <Grid
          onClick={() => handlePackageSelection(dietPackage)}
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          key={dietPackage.id}
        >
          <CardComponent
            title={dietPackage.name}
            image={dietPackage.image}
          />
        </Grid>
      })}

      {getDietPackagesData().length === 0 && <Grid item xs={12}>
        <Box>No diet packages exist, please try to search something else!</Box>
      </Grid>
      }
    </Grid>
    <CreatePackage open={showCreatePackage} handleClose={setShowCreatePackage} />
    <ViewPackage
      open={showViewPackage}
      handleClose={setShowViewPackage}
      packageDetail={selectedPackage as DietPackageType}
      selectedPlan={getSelectedPlan()}
    />
  </Box >
}