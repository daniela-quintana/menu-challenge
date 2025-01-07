import React, { useState, useEffect } from "react";
import { MenuItem } from "../types/menu";
import Link from "next/link";
import Image from "next/image";

const MenuList: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      const response = await fetch("/menu.json");
      const data: MenuItem[] = await response.json();
      setMenuItems(data);
      console.log("response", response);
    };

    fetchMenuData();
  }, []);

  return (
    <div>
      <h1>Menú del Restaurante</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Precio: ${item.price}</p>
            <Image
              src={item.image}
              alt={item.name}
              style={{ borderRadius: "8px" }}
            />
            <Link href={`/menu/${item.id}`}>Ver detalles</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;