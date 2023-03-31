import { GetStaticProps } from "next";
import { Htag, Rating, Tag } from "@/components";
import { useEffect, useState } from "react";
import { Button } from "../components/Button/Button";
import { P } from "../components/Paragraph/Ptag";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { Input } from "../components/Input/Input";
import { TextArea } from "../components/TextArea/TextArea";
import { API } from "../helpers/api";

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    if (counter > 0) {
      console.log("Counter" + counter);
    }
  });

  return (
    <>
      <Htag tag="h1">Заголовок</Htag>
      <Button appearence="primary" arrow="down" className="amogus">
        Кнопка
      </Button>
      <Button
        appearence="ghost"
        arrow="right"
        onClick={() => setCounter((x) => x + 1)}
      >
        Кнопка
      </Button>
      <h2>{counter}</h2>
      <P size="p3">Big</P>
      <P>Default</P>
      <P size="p1">Small</P>
      <Tag size="m" color="ghost">
        ghost
      </Tag>
      <Tag size="s" color="primary">
        primary
      </Tag>
      <Tag size="m" color="red">
        red
      </Tag>
      <Tag size="m" color="green">
        green
      </Tag>
      <Tag size="s" color="gray">
        gray
      </Tag>
      <Rating rating={rating} isEditable={true} setRating={setRating}></Rating>
      <Input placeholder="Имя Мироздания" />
      <TextArea placeholder="Описание Мироздания" />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
  return {
    props: {
      menu: menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
