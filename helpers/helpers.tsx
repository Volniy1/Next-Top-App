import CoursesIcon from "./icons/Courses.svg";
import ServicesIcon from "./icons/Services.svg";
import BooksIcon from "./icons/Books.svg";
import ProductsIcon from "./icons/Goods.svg";
import { TopLevelCategory } from "../interfaces/page.interface";
import { FirstLevelMenuItem } from "../interfaces/menu.interface";
// import SearchIcon from "./icons/Search.svg";

export const firstLevelMenu: FirstLevelMenuItem[] = [
  // {
  //   route: "Search",
  //   name: "Search",
  //   icon: <SearchIcon />,
  //   id: TopLevelCategory.Search,
  // },
  {
    route: "courses",
    name: "Курсы",
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses,
  },
  {
    route: "Services",
    name: "Услуги",
    icon: <ServicesIcon />,
    id: TopLevelCategory.Services,
  },
  {
    route: "Books",
    name: "Книги",
    icon: <BooksIcon />,
    id: TopLevelCategory.Books,
  },
  {
    route: "Products",
    name: "Продукты",
    icon: <ProductsIcon />,
    id: TopLevelCategory.Products,
  },
];

export const priceRu = (price: number): string =>
  price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .concat(" ₽");

export const declOfNum = (
  number: number,
  titles: [string, string, string]
): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};
