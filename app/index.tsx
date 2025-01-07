 'use client'

import React from 'react';
import MenuCard from '../components/MenuCard';
import menuData from '../public/menu.json';
import { Grid, Typography } from '@mui/joy';
// import { useRouter } from 'next/navigation';

const Home = () => {
  // const router = useRouter();

  return (
    <div style={{ padding: '2rem' }}>
      <Typography level="h1" fontWeight="bold" color="warning" mb={1} style={{ textAlign: 'center', marginBottom: '2rem' }}>Menu Restaurant</Typography>
      <Grid container spacing={2} justifyContent="center">
        {menuData.map((item) => (
          <MenuCard
            key={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
            // onClick={() => router.push(`/${item.id}`)}
            onClick={() => console.log('test')}
          />
        ))}
      </Grid>
    </div>
  );
};

export default Home;