import { addElement } from "./modules/addElement.js";

const tableauClasses = ["6eme", "5eme", "4eme", "3eme"];

// Liste des classes de couleur
const colors = [
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
];

let container = document.getElementById("classes");

tableauClasses.map((item, index) => {
  const randomColor = colors[index % colors.length];
  let card = addElement(
    "a",
    [
      "w-64",
      "h-64",
      randomColor,
      "rounded-lg",
      "text-white",
      "text-center",
      "text-2xl",
      "font-semibold",
      "p-4",
      "m-4",
      "hover:shadow-md",
      "transition",
      "duration-300",
      "ease-in-out",
      "flex",
      "items-center",
      "justify-center",
    ],
    { href: `classe.html?classe=${item}` },
    `${item}`
  );

  container.appendChild(card);
});
