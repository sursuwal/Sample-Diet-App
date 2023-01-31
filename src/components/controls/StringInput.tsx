import React from 'react'
import TextField from '@mui/material/TextField'

type StringInputType = {
  id: string,
  label?: string,
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
  value: string,
  type?: 'text' | 'password',
  disabled?: boolean,
  placeholder?: string,
  required?: boolean,
  helperText?: string,
  error?: boolean,
  onBlur?: (React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined),
  dataTestId?: string
}

export function StringInput({
  id,
  label,
  disabled = false,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  helperText = '',
  error = false,
  onBlur = () => { },
  dataTestId = undefined,
}: StringInputType) {
  return (
    <TextField
      fullWidth={true}
      id={id}
      label={label}
      variant="outlined"
      onChange={onChange}
      disabled={disabled}
      type={type}
      placeholder={placeholder}
      required={required}
      helperText={helperText}
      error={error}
      onBlur={onBlur}
      inputProps={{ 'data-testid': dataTestId }}
    />
  )
}
