import React, { useEffect } from 'react'
import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import { Box, SelectChangeEvent } from '@mui/material'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { ButtonControl, SelectControl, StringInput } from '../../components/controls'
import { PlansType } from '../../services/types'
import { getPlans, savePackage } from '../../services/api'

type CreatePackageProps = {
  open: boolean,
  handleClose: () => void
}

type FormErrors = {
  name: string,
  plan: string,
}

export default function CreatePackage({ open, handleClose }: CreatePackageProps) {
  const [name, setName] = useState('')
  const [plans, setPlans] = useState<PlansType[]>([])
  const [selectedPlan, setSelectedPlan] = useState('')
  const [errors, setErrors] = useState<FormErrors>({ name: '', plan: '' })

  const handleSave = async () => {
    await savePackage({
      name,
      image: 'http://www.dietitianrenupreet.com/wp-content/uploads/2020/04/Top-Weight-Gain-Centers-In-India.jpg',
      planId: +selectedPlan
    })
    setName('')
    setSelectedPlan('')
    handleClose()
  }

  const handlePlanOnBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!e?.target?.value) {
      setErrors({ ...errors, plan: 'Please select Plan' })
    } else {
      setErrors({ ...errors, plan: '' })
    }
  }

  const onSelectPlan = (e: SelectChangeEvent) => {
    setSelectedPlan(e.target.value)
    handlePlanOnBlur(e as any)
  }

  const handleNameOnBlur = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!e?.target?.value) {
      setErrors({ ...errors, name: 'Package name is required' })
    } else {
      setErrors({ ...errors, name: '' })
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(e.target.value)
    handleNameOnBlur(e)
  }

  const checkFormValid = () => {
    let isValid = true
    if (!name || !selectedPlan) {
      isValid = false
    }
    return isValid
  }

  // get the plans when component loads
  useEffect(() => {
    (async () => {
      try {
        const plansData = await getPlans()
        setPlans(plansData)
      } catch (e) { }
    })()

  }, [])

  return (
    <div data-testid='create-package'>
      <Dialog open={open} maxWidth='md' fullWidth>
        <DialogTitle>Create Package</DialogTitle>
        <Box mb={0.5} />
        <DialogContent>
          <StringInput
            id='package_name'
            value={name}
            onChange={(e) => handleNameChange(e)}
            type='text'
            label='Package Name'
            required={true}
            error={errors?.name ? true : false}
            helperText={errors?.name}
            onBlur={handleNameOnBlur}
            dataTestId='package_name'
          />
          <Box mb={2} />
          <SelectControl
            value={selectedPlan}
            options={[{ id: '', name: 'Select Plan' }, ...plans]}
            label='Select Plan'
            onChange={onSelectPlan}
            onBlur={handlePlanOnBlur}
            helperText={errors?.plan || ''}
            error={errors?.plan ? true : false}
            name='selectedPlan'
            dataTestId='select-plan'
          />
        </DialogContent>
        <DialogActions>
          <ButtonControl onClick={handleClose} title='Cancel' />
          <ButtonControl disabled={checkFormValid() ? undefined : true} onClick={handleSave} title='Save' />
        </DialogActions>
      </Dialog>
    </div>
  )
}