"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuItem } from "../../../types/menu";
import { Box, Button, Typography } from "@mui/joy";
import Image from "next/image";

interface Params {
  id: string;
}

export default function MenuDetails({ params }: { readonly params: Params }) {
  const router = useRouter();
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchMenuItem = async () => {
      try {
        const res = await fetch("http://localhost:3000/menu.json");
        const menuItems: MenuItem[] = await res.json();
        const item = menuItems.find((item) => item.id.toString() === id);
        setMenuItem(item || null);
      } catch (error) {
        console.error("Error fetching menu item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Button loading color="warning" variant="soft" />
      </Box>
    );
  }

  if (!menuItem) {
    return <Typography>Plato no encontrado</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 2 }}>
      <Button
        variant="plain"
        color="warning"
        size="md"
        onClick={() => router.push("/")}
        sx={{
          alignSelf: "flex-start",
        }}
      >
        ← Volver al menú
      </Button>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          height: "80vh",
        }}
      >
        <Box
          sx={{
            flex: 2,
            height: "100%",
            overflow: "hidden",
            borderRadius: "8px",
          }}
        >
          <Image
            src={menuItem.image}
            alt={menuItem.name}
            width={500}
            height={500}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "center",
            padding: { xs: "1rem", md: "2rem" },
          }}
        >
          <Typography level="h2">{menuItem.name}</Typography>
          <Typography level="body-md">{menuItem.description}</Typography>
          <Typography level="h4" color="warning">
            ${menuItem.price}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
