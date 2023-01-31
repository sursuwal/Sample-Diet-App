import React from 'react'
import Button from '@mui/material/Button'

type ButtonProps = {
  title: string,
  type?: 'button' | 'submit' | 'reset',
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  disabled?: boolean | undefined,
}

export function ButtonControl({
  title,
  type = 'button',
  onClick,
  disabled = undefined
}: ButtonProps) {
  return (
    <Button
      variant="contained"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </Button>
  )
}
