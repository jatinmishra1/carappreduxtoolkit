import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { addCars, getAllCars } from "../features/cars/carSlice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("name is required").min(3),
  carid: yup.number().required("card is is required"),
});

export default function Home() {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.cars);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  useEffect(() => {
    const dummyCars = [
      { name: "Maruti" },
      { name: "Toyota" },
      { name: "SUDAN" },
    ];
    dispatch(getAllCars(dummyCars));
  }, []);

  const onSubmit = (data) => {
    dispatch(addCars(data));
    setTimeout(() => {
      window.location.href = "/";
    }, 200);
  };

  return (
    <>
      <DefaultLayout>
        <h1>
          WELCOME TO THE HOME PAGE OF CARS BOOKING, YOUR JOURNEY START FROM HERE
        </h1>
        {cars && cars.map((car, index) => <h2 key={index}>{car.name}</h2>)}
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Enter the car Name</label>
          <input {...register("name")} id="name" />
          <p>{errors.name?.message}</p>

          <label htmlFor="carid">Card Id</label>
          <input {...register("carid")} id="carid" type="number" />
          <p>{errors.carid?.message}</p>

          <button type="submit">Add Car</button>
        </form>
      </DefaultLayout>
    </>
  );
}
