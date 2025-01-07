import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { MenuItem } from '../types/menu';
import { Box, Button, Typography } from '@mui/joy';
import Image from 'next/image';

interface MenuDetailsProps {
  menuItem: MenuItem | null;
}

const MenuDetails: React.FC<MenuDetailsProps> = ({ menuItem }) => {
  const router = useRouter();

  if (router.isFallback || !menuItem) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 2 }}>
      <Button
        variant="plain"
        color="warning"
        size="md"
        onClick={() => router.push('/')}
        sx={{
          alignSelf: 'flex-start',
        }}
      >
        ← Volver al menú
      </Button>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          height: '80vh',
        }}
      >
        <Box
          sx={{
            flex: 2,
            height: '100%',
            overflow: 'hidden',
            borderRadius: '8px',
          }}
        >
          <Image
            src={menuItem.image}
            alt={menuItem.name}
            width={500}
            height={500}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            justifyContent: 'center',
            padding: { xs: '1rem', md: '2rem' },
          }}
        >
          <Typography level="h2">
            {menuItem.name}
          </Typography>
          <Typography level="body-md">
            {menuItem.description}
          </Typography>
          <Typography level="h4" color="warning">
            ${menuItem.price}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/menu.json');
  const menuItems: MenuItem[] = await res.json();

  const paths = menuItems.map((item) => ({
    params: { id: item.id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch('http://localhost:3000/menu.json');
  const menuItems: MenuItem[] = await res.json();

  const menuItem = menuItems.find((item) => item.id.toString() === params?.id);

  console.log('menuItem', menuItem)

  return {
    props: {
      menuItem: menuItem || null,
    },
  };
};

export default MenuDetails;