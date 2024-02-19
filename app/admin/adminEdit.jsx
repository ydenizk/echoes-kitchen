"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

import { CldUploadButton } from "next-cloudinary";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useEditModalStore } from "@/utils/store";

const AdminEdit = ({ product }) => {
  const { editFormOpen, openEditForm, closeEditForm } = useEditModalStore();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [options, setOptions] = useState([]);

  const [inputs, setInputs] = useState({
    title: product.title,
    desc: "",
    price: "",
    catTitle: "",
  });

  //bu ikisi cloudinary için...ve product ın iki elemanı
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");

  useEffect(() => {
    // Set the component state based on the new product prop
    setOptions(product.options || [{ size: "", price: "" }]);
    setInputs({
      title: product.title,
      desc: product.desc,
      price: product.price.toFixed(2),
      catTitle: product.catTitle,
    });
    setImageUrl(product.imageUrl);
    setPublicId(product.publicId);
  }, [product]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center gap-4 h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <div className="text-xl font-light">Loading ...</div>
      </div>
    );
  }

  //options part...

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index][e.target.name] = e.target.value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { size: "", price: "" }]);
  };

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };
  //options END.....

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedInputs = {
      ...inputs,
      imageUrl,
      publicId,
      price: parseFloat(inputs.price), // Parse the price to a float
      options: options.map((option) => ({
        ...option,
        price: parseFloat(option.price), // Also parse the price for each option
      })),
    };

    try {
      const res = await fetch(
        `${process.env.PUBLIC_URL}/api/products/${product.id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(parsedInputs),
        }
      );
      if (res.ok) {
        toast.success("New product updated succesfully...");
      }
      if (!res.ok) {
        toast.error("An error occurred..");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //cloudinary function
  //cloudinaryden result dönüor ,içinde public id ve secure_url  var
  const handleImageUpload = (result) => {
    const info = result.info;
    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url;
      const public_id = info.public_id;
      setImageUrl(url);
      setPublicId(public_id);
    }
  };
  //cloudinary remove ımage ,btn için...
  const removeImageFunction = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("api/removeImage", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
      /*  if (res.ok) {
        setImageUrl("");
        setPublicId("");
      } */
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="w-96 p-4    mx-auto text-neutral-700   "
      onSubmit={handleSubmit}
    >
      <div className="mb-2">
        <input
          name="title"
          type="text"
          required
          value={inputs.title}
          placeholder="Title"
          className="w-full  border border-gray-400 p-1 outline-none rounded  "
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <textarea
          name="desc"
          type="text"
          required
          value={inputs.desc}
          placeholder="Description"
          rows="4"
          className="w-full  border border-gray-400 p-1 outline-none rounded   "
          onChange={handleChange}
        />
      </div>
      {/* Image Clodinary */}

      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        className={`flex w-full h-32 border border-gray-300  items-center justify-center 
         bg-gray-200 cursor-pointer mb-2 relative outline-none  rounded text-gray-500 gap-2 ${
           imageUrl && "pointer-events-none"
         }   `}
        onUpload={handleImageUpload}
      >
        <IoCloudUploadOutline />
        <p>Upload Image</p>
        {imageUrl && (
          <Image
            src={imageUrl}
            fill
            alt="pic"
            className="absolute object-cover inset-0 rounded"
          />
        )}
      </CldUploadButton>
      {/* resim seçip erana geldiğinde,submit öncesi,resmi kaldımak 
      istersek yada değiştitmek için remove btn ,bunun için ayrı api route yarttık sadce*/}
      {publicId && (
        <button
          onClick={removeImageFunction}
          className="p-1 bg-red-200  rounded  m1-2  text-xs font-extralight mt-1 mb-3 "
        >
          Remove Image
        </button>
      )}

      {/* Image ends........ */}

      <div>
        <input
          name="price"
          type="number"
          step="0.01"
          value={inputs.price}
          required
          placeholder="Price €"
          className="w-full  border border-gray-400 mb-2 p-1 outline-none rounded  "
          onChange={handleChange}
        />
      </div>

      {/* Options part START */}
      <div className="my-2 ">
        <p className=" text-sm text-gray-700 font-light">
          Choose Options if there is any
        </p>
        {options?.map((option, index) => (
          <div key={index} className="flex items-center  w-full ">
            <select
              name="size"
              value={option.size}
              onChange={(e) => handleOptionChange(index, e)}
              required
              className="mb-1 appearance-none outline-none mt-1 bg-gray-300 text-center
              rounded p-[2px] px-2 text-neutral-800 text-sm "
            >
              <option value="">Select Size </option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
            <input
              name="price"
              type="number"
              step="0.01"
              placeholder="Option price"
              value={option.price}
              onChange={(e) => handleOptionChange(index, e)}
              required
              className="mx-2 w-28 border border-gray-400 p-[2px] text-sm outline-none rounded text-neutral-800 "
            />
            <button
              type="button"
              onClick={() => removeOption(index)}
              className="bg-red-300 p-1  text-xs my-2
            cursor-pointer  font-light  rounded hover:bg-red-400 transition border border-gray-200 "
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addOption}
          className=" p-1  text-sm my-2
      cursor-pointer  bg-green-200 border border-gray-200  font-light transition hover:bg-gray-500  rounded"
        >
          Add Option
        </button>
      </div>
      {/* Options part END */}

      <div className="w-full flex justify-between items-center ">
        <select
          required
          name="catTitle"
          value={inputs.catTitle}
          onChange={handleChange}
          type="text"
          className="mb-2 appearance-none outline-none  bg-gray-300 text-center
          rounded p-1 px-2 text-slate-800"
        >
          <option value="">Select A Category</option>
          <option value="Burgers">Burgers</option>
          <option value="Salads">Salads</option>
          <option value="French-Fries">French Fries</option>
          <option value="Menus">Menus</option>
          <option value="Menus">Beverages</option>
        </select>
      </div>
      <button
        type="submit"
        className=" bg-gray-900 mt-2 p-2 rounded 
      cursor-pointer  w-full text-white transition hover:opacity-80 duration-500 "
      >
        Edit
      </button>
      <Toaster />
    </form>
  );
};

export default AdminEdit;
