import React from 'react'
import { getPlans } from '../../services/api'
import { useEffect } from 'react'
import { useState } from 'react'
import { PlansType } from '../../services/types'
import { Box, Grid } from '@mui/material'
import { StringInput } from '../../components/controls'
import { CardComponent } from '../../components'

export const PlansPage = () => {
  const [plans, setPlans] = useState<PlansType[]>([])
  const [search, setSearch] = useState('')

  // return filtered data
  const getPlansData = () => {
    if (!search) {
      return plans
    }

    return plans.filter((plan: PlansType) => plan.name.toLowerCase().includes(search.toLowerCase()))
  }

  // get plans when component loads
  useEffect(() => {
    (async () => {
      try {
        const plansData = await getPlans()
        setPlans(plansData)
      } catch (e) { console.error(e) }
    })()

  }, [])

  return <Box>
    <Box>
      <StringInput
        id={'search'}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder='Search Plans'
        dataTestId='search_plans'
      />
    </Box>
    <Grid container spacing={2} mt={2}>
      {getPlansData().length > 0 && getPlansData().map((plan: PlansType) => {
        return <Grid item xs={12} sm={12} md={4} key={plan.id}>
          <CardComponent
            title={plan.name}
            description={plan.benefits}
          />
        </Grid>
      })}

      {getPlansData().length === 0 && <Grid item xs={12}>
        <Box>No plans exist, please try to search something else!</Box>
      </Grid>
      }
    </Grid>
  </Box>
}
