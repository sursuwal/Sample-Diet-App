import React from 'react'
import { FocusEventHandler } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { FormHelperText } from '@mui/material'

type SelectControlProps = {
  label: string,
  value: number | string,
  options: any[],
  onChange: (event: SelectChangeEvent) => void,
  onBlur?: (FocusEventHandler<HTMLInputElement | HTMLTextAreaElement | undefined>),
  helperText?: string,
  error?: boolean,
  name: string,
  dataTestId?: string
}

export function SelectControl({
  label,
  value,
  options,
  onChange,
  onBlur = undefined,
  helperText = '',
  error = false,
  name,
  dataTestId = undefined,
}: SelectControlProps) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth error={error}>
        <InputLabel id={label}>{label}</InputLabel>
        <Select
          inputProps={{ 'data-testid': dataTestId }}
          labelId={label}
          id={`${label}-select`}
          value={value as string}
          label={label}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
        >
          {options.map((option) => <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>)}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </Box>
  )
}