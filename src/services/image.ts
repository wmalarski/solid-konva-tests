// "https://res.cloudinary.com/demo/image/upload/c_crop,h_200,w_300,x_255,y_410/brown_sheep.jpg";
const imagesRoot = "https://res.cloudinary.com/demo/image/upload";

type GetImage = {
  path: string;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
};

export const getImage = ({ h, path, w, x, y }: GetImage) => {
  const height = h || h === 0 ? `,h_${h}` : "";
  const width = w || w === 0 ? `,w_${w}` : "";
  const left = x || x === 0 ? `,x_${x}` : "";
  const top = y || y === 0 ? `,y_${x}` : "";
  return `${imagesRoot}/c_crop${height}${width}${left}${top}/${path}`;
};
