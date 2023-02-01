import { Label, TextInput, Button, Select, Textarea, Toast } from 'flowbite-react'
import { ImWarning } from 'react-icons/im';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, getFoodById, postFood, putEdit } from '../stores/actionCreator';
import Lottie from "lottie-react";
import loading from "../assets/animations/loading.json";


// Functionanl Component
const AddEditForm = function(){
  const { FoodId } = useParams()
  const navigate = useNavigate()
  const { categories: dataCategories, isLoading } = useSelector((state) => state.categoriesReducer)
  const { foodById } = useSelector((state) => state.foodReducer)
  const [foodData, setFoodData] = useState({ name:'', description:'', price:'', categoryId:'', imgUrl:'' })
  const [isLoadingFetch, setIsLoadingFetch] = useState(true)
  const [inputFields, setInputFields] = useState([''])
  const [ingredientButton, setIngredientButton] = useState(false)
  const [isError, setIsError] = useState({})

  const dispatcher = useDispatch()
  
  const handleFormChange = (index, event) => {
    event.preventDefault()
    let data = [...inputFields];
    data[index] = event.target.value;
    setInputFields(data);
  }
  const addFields = () => {
    let newfield = ''
    setInputFields([...inputFields, newfield])
  }
  const removeFields = () => {
    if (inputFields.length > 1){
      inputFields.pop()
      let data = [...inputFields];
      setInputFields(data)
    } else {
      setInputFields([''])
    }
  }
  const handleSubmitAll = async () => {
    const postData = {
      ...foodData,
      ingredients: inputFields
    }
    
    if (FoodId) {
      let { error } = await dispatcher(putEdit(postData, FoodId))
      if (error) { setIsError(error.message) } 
      else { navigate('/food') }
    } else {
      let { error } = await dispatcher(postFood(postData))
      if (error) { setIsError(error.message) } 
      else { navigate('/food') }
    }
  }

  const loadData = async ()=> {
    try {
      await dispatcher(getCategories())
      await dispatcher(getFoodById(FoodId))
      setIsLoadingFetch(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    loadData()
  },[])

  useEffect(()=>{
    if (FoodId) {
      setFoodData({ name:foodById.name, description:foodById.description, price:foodById.price, categoryId:foodById.categoryId, imgUrl:foodById.imgUrl })
      setInputFields(foodById.Ingredients.map(el=>{return el.name}))
    }
  },[foodById])

  const handleButtonIngredient = ()=>{
    setIngredientButton(true)
  }  

  return(
    <div className="h-full w-full relative mt-20">
      {
        isLoadingFetch?
        <>
          <Lottie animationData={loading} className='fixed h-1/2 w-screen'/>:
        </>:
        <>
          {
            Object.keys(isError).length &&
            <div className=' flex justify-center'>
              <Toast className='bg-[#c40d38] fixed top-0 mt-24 shadow-lg'>
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-red-500 ">
                    <ImWarning className="h-5 w-5" />
                  </div>
                  <div className="ml-3 text-sm font-normal text-white">
                    Invalid Input
                  </div>
                  <Toast.Toggle className='bg-[#c40d38] text-white'/>
                </Toast>
            </div>
          }

          <div className={`h-full bg-white mx-auto rounded-xl p-16 duration-400 ${!ingredientButton ? "w-1/2" : "w-2/3"}`}>
            <div className={`grid duration-400 ${!ingredientButton ? "grid-cols-2" : "grid-cols-3"} h-full w-full`}>

              <div className='col-span-2 '>
                <div className='mb-8'>
                  <span className='text-2xl font-semibold'>Add New Food</span>
                </div>
                <form className="flex flex-col gap-4">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="name" value="Food name" />
                    </div>
                    <TextInput id="name" type="text" placeholder="" required={true} color={isError.name?"failure":''} value={foodData.name}
                      onChange={ (event) => {
                        setIsError({})
                        setFoodData({
                          ...foodData,
                          name:event.target.value
                        })
                      }}
                    />
                  </div>
                  <div id="select">
                    <div className="mb-2 block">
                      <Label htmlFor="category" value="Category"/>
                    </div>
                    <Select id="category" required={true} color={isError.categoryId?"failure":''} value={foodData.categoryId===''?'default':foodData.categoryId}
                      onChange={ (event) => {
                        setIsError({})
                        setFoodData({
                          ...foodData,
                          categoryId:event.target.value
                        })
                      }}
                    >
                      <option disabled value='default'>Select category</option>
                      {
                        dataCategories.map((el)=>{
                          return (
                          <option value={el.id} key={"option"+el.id}>
                            {el.name}
                          </option>
                          )
                        })
                      }
                    </Select>
                  </div>
                  <div id="textarea">
                    <div className="mb-2 block">
                      <Label htmlFor="Description" value="Description"/>
                    </div>
                    <Textarea id="Description" placeholder="Food description" required={true} rows={4} color={isError.description?"failure":''} value={foodData.description}
                      onChange={ (event) => {
                        setIsError({})
                        setFoodData({
                          ...foodData,
                          description:event.target.value
                        })
                      }}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="price" value="Price"/>
                    </div>
                    <TextInput id="price" type="number" placeholder="" min="0" required={true} color={isError.price?"failure":''} value={foodData.price}
                      onChange={ (event) => {
                        setIsError({})
                        setFoodData({
                          ...foodData,
                          price:event.target.value
                        })
                      }}
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="imageUrl" value="Image Url"/>
                    </div>
                    <TextInput id="imageUrl" type="text" placeholder="" required={true} color={isError.imgUrl?"failure":''} value={foodData.imgUrl}
                      onChange={ (event) => {
                        setIsError({})
                        setFoodData({
                          ...foodData,
                          imgUrl:event.target.value
                        })
                      }}
                    />
                  </div>
                  <div className='flex mt-4 justify-between'>
                    <Link to='/food'>
                      <Button type="button" className='mr-4 bg-red-600 hover:bg-red-700'>
                        Cancel
                      </Button>
                    </Link>
                    { !ingredientButton && (<Button type="button" onClick={handleButtonIngredient}>
                      Add Ingredient
                    </Button>)}
                  </div>
                </form>
              </div>

              {ingredientButton && (<div className='col-span-1'>
                <div className='ml-8'>
                  <div className=' mb-8'>
                    <span className='text-2xl font-semibold'>Add Ingredients</span>
                  </div>

                  <form>
                    <div className="mb-2 block">
                      <Label htmlFor="name" value={`Ingredient (limited to five ingredient)`} />
                    </div>
                      {inputFields.map((input, index) => {
                        return (
                          <div className='w-full flex' key={`ingredient`+index}>
                            <TextInput type="text" className="w-full mb-8" defaultValue={input} color={Object.keys(isError).length>1?"failure":''} 
                            onChange={event =>{ 
                              setIsError({})
                              handleFormChange(index, event)
                            }}/>
                            { ((index === inputFields.length-1) && inputFields.length <5)  && <Button type="button" className='ml-4 bg-red-600' onClick={addFields}>+</Button> }
                            { index === inputFields.length-1  && <Button type="button" className='ml-4 bg-red-600' onClick={removeFields}>x</Button> }
                          </div>
                        )
                      })}
                  </form>
                  { ingredientButton && (<Button type="button" className='absolute bottom-0 mb-16' onClick={handleSubmitAll}>
                      Submit
                    </Button>)}
                </div>
              </div>)}

            </div>
          </div>   
        </>
      }
    </div>
  )
}

export default AddEditForm;