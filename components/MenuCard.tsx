import Image from 'next/image';
import React from 'react';
import { Card, CardContent, Typography, Button, AspectRatio } from '@mui/joy';

interface MenuCardProps {
  name: string;
  price: number;
  description: string;
  image: string;
  onClick: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ name, price, description, image, onClick }) => {
  return (
    <Card variant="outlined" sx={{ width: 300, margin: '1rem', boxShadow: 'md' }}>
      <AspectRatio ratio="4/3">
        <Image
          src={image}
          alt={name}
          width={300}
          height={225}
          style={{ borderRadius: '8px' }}
        />
      </AspectRatio>
      <CardContent>
        <Typography level="h2" fontSize="lg" mb={0.5}>
          {name}
        </Typography>
        <Typography level="body-sm" textColor="text.secondary" mb={1}>
          {description}
        </Typography>
        <Typography level="body-lg" fontWeight="bold" mb={1}>
          ${price.toFixed(2)}
        </Typography>
        <Button onClick={onClick} variant="soft" color="warning">
          Ver detalles
        </Button>
      </CardContent>
    </Card>
  );
};

export default MenuCard;