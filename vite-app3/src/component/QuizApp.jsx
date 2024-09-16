import React, { useEffect ,useState} from 'react'
import { Text,Card,CardBody, Box,Grid,Flex , Image, Select, Input, Checkbox, Button} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import FetchData from './FetchData';
import { useNavigate } from 'react-router-dom';

const QuizApp = () => {

    const dispatch=useDispatch();
    const {isLoading,isError, data}=useSelector((state)=>state.data);
    const[page, setPage]=useState(1);
    const[score,setScore]=useState(0);
    const [checked, setChecked]=useState(false)
    const[showScorePage, setScorePage]=useState(false);
    const navigate=useNavigate();
    const totalPage=10;
    console.log(data)

    let url=`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-quiz?page=${page}&limit=1`
    useEffect(()=>{

        dispatch(FetchData(url));

    },[dispatch,page])

        if(isLoading){
            return <Text>Currently data is Loading....</Text>
        }
        if(isError){

            return(
                <Text>Something Went Wrong with us</Text>
            )
        }

        const handleClick=(id,selectedOption)=>{
                console.log("checkbox is clicked")
           
                const question=data.find((ques)=>ques.id===id);

                if(question){

                    if(question.correctOptionIndex===selectedOption){
                        setScore((prev)=>prev+10);
                    }
                }

        }
        const handleSubmit=()=>{
            setScorePage(true);

        }

        const handleRestart=()=>{
            setPage(1);
            setScore(0);
            setScorePage(false)
            setChecked(false)
        }

     
        if(showScorePage){

            return(
                <Card>
                    <CardBody textAlign={'center'} >
                        <Text fontSize={40}> {score>70?`Hey You Played Great 😃:)`:'Need To Improve 😔'}</Text>
                        <Text fontSize={50}>Your Score : {score}/100</Text>
                        <Button onClick={handleRestart} mt={20} fontWeight={'bold'}>RE-START THE QUIZ</Button>
                    </CardBody>
                </Card>
            )
        }

        
  return (

    <>
    <Flex justify={'space-between'} m={5}>
    <Text fontSize={30} fontWeight={'bold'}>QuizApp</Text>
    
    <Button onClick={handleSubmit} fontWeight={'bold'}>SUBMIT QUIZ</Button>
    
    </Flex>

           
           <Card>

             
            

                {data.map((ques,i)=>{

                    return(
                        <CardBody key={ques.id}> <Text> Q{ques.id}.) {ques.question}</Text>
                        
                          <Flex direction={'column'} > 
                            {ques.options.map((option,i)=>{
                                
                                return (
                                    <Checkbox 
                                    onChange={() => {
                                        console.log("Checkbox clicked for option:", option); // Add a log here
                                        handleClick(ques.id, i);
                        
                                    }}
                                    m={2}
                                    key={i}
                                >
                                    {option}
                                </Checkbox>
                                )

                            })}
                          </Flex>
                        
                         </CardBody>
                    )
                })}
           </Card>

           <Flex m={10} mt={200}  justify={'space-between'} >
                <Button bg={'lightcyan'} onClick={()=>setPage(page-1)} isDisabled={page==1} > Prev Question</Button>
                <Button bg={'lightcyan'} onClick={()=>
                    {setPage(page+1)}} isDisabled={page===totalPage }> Skip This question</Button>
                <Button bg={'lightcyan'} onClick={()=>setPage(page+1)}  isDisabled={page==totalPage}>Next question</Button>
                

           </Flex>
    </>
  )
}

export default QuizApp