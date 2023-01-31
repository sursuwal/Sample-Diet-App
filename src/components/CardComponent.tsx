import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'


type CardComponentProps = {
  title: string,
  image?: string,
  description?: string,
}

export function CardComponent({ title, image = '', description = '' }: CardComponentProps) {
  return (
    <Card style={{ cursor: 'default' }}>
      <CardActionArea>
        {image && <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          {description && <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
