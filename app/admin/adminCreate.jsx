"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

import { CldUploadButton } from "next-cloudinary";
import { IoCloudUploadOutline } from "react-icons/io5";

const AdminCreate = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [options, setOptions] = useState([{ size: "", price: "" }]);

  const [inputs, setInputs] = useState({
    title: "",
    desc: "",
    price: 0,
    catTitle: "",
  });

  //bu ikisi cloudinary için...ve product ın iki elemanı
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");

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
      const res = await fetch(`${process.env.PUBLIC_URL}/api/products`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(parsedInputs),
      });
      if (res.ok) {
        toast.success("New product added succesfully...");
        setInputs({
          title: "",
          desc: "",
          price: 0,
          catTitle: "",
        });
        setOptions([{ size: "", price: "" }]);
        setImageUrl("");
        setPublicId("");
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
    console.log("result", result);

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
      const res = await fetch(`${process.env.PUBLIC_URL}/api/removeImage`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
      if (res.ok) {
        setImageUrl("");
        setPublicId("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="w-96 p-4  mx-auto text-neutral-200 xs:w-80 py-8 pt-4" onSubmit={handleSubmit}>
      <div className="mb-2">
        <input
          name="title"
          type="text"
          required
          value={inputs.title} 
          placeholder="Title"
          className="w-full  border p-1 outline-none rounded text-neutral-600 "
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
          className="w-full  border p-1 outline-none rounded text-neutral-600 "
          onChange={handleChange}
        />
      </div>
      {/* Image Clodinary */}

      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        className={`flex w-full h-36 border border-neutral-500  items-center justify-center 
         bg-gray-400 cursor-pointer mb-2 relative outline-none  rounded text-neutral-700 gap-2 ${
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
          className="p-1 bg-red-700 rounded  m1-2  text-xs font-extralight mt-1 mb-3 "
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
          placeholder="Price"
          className="w-full  border mb-2 p-1 outline-none rounded text-neutral-600"
          onChange={handleChange}
        />
      </div>

      {/* Options part START */}
      <div className="my-4 ">
        <p className=" text-sm text-neutral-300 font-light">Choose Options if there is any</p>
        {options.map((option, index) => (
          <div key={index} className="flex items-center  w-full ">
            <select
              name="size"
              value={option.size}
              onChange={(e) => handleOptionChange(index, e)}
              required
              className="mb-1 appearance-none outline-none mt-1 bg-slate-300 text-center
              rounded p-[2px] px-2 text-slate-600"
            >
              <option value="">Select Size</option>
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
              className="mx-2 w-48 p-1 text-sm outline-none rounded text-neutral-600"
            />
            <button
              type="button"
              onClick={() => removeOption(index)}
              className="border border-white p-1  text-xs my-2
            cursor-pointer  text-neutral-300 font-light  rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addOption}
          className="border border-white p-1  text-sm my-2
      cursor-pointer  text-neutral-300 font-light transition hover:bg-gray-500  rounded"
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
          className="mb-2 appearance-none outline-none  bg-slate-300 text-center
          rounded p-1 px-2 text-slate-600"
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
        className=" bg-neutral-100 mt-2 p-2 rounded 
      cursor-pointer  w-full text-blackk"
      >
        Submit
      </button>
      <Toaster />
    </form>
  );
};

export default AdminCreate;
