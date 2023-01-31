import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { DietPackageType, PlansType } from '../../services/types'
import { ButtonControl } from '../../components/controls/ButtonControl';

type ViewPackageProps = {
  packageDetail: DietPackageType,
  open: boolean,
  handleClose: () => void,
  selectedPlan: PlansType | undefined
}

export default function ViewPackage({ open,
  handleClose,
  packageDetail,
  selectedPlan
}: ViewPackageProps) {

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {packageDetail?.name}
        </DialogTitle>
        <DialogContent>
          <h3>{selectedPlan?.name || ''}</h3>
          <DialogContentText id="alert-dialog-description">
            {selectedPlan?.benefits}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonControl onClick={handleClose} title='Close' />
        </DialogActions>
      </Dialog>
    </div>
  )
}
