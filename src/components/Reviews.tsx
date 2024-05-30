import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StarIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "./ui/alert-dialog";
import {toast} from "sonner";

interface ReviewsProps {
  productId: string;
}

interface UserData {
  id: string;
  userName: string;
  name: string;
  surName: string;
  middleName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  avatar: string;
}
interface User {
  name: string;
  surName: string;
  middleName: string;
  avatar: string;
}
interface ApiResponse {
  data: Review[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface Review {
  id: number;
  rating: number;
  text: string;
  createdAt: string;
  user: User;
  haveComments: boolean;
}

interface Comment {
  id: number;
  text: string;
  createdAt: string;
  user: User;
  haveComments: boolean
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Reviews: React.FC<ReviewsProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
  const [subComments, setSubComments] = useState<{ [key: number]: Comment[] }>({});
  const [response, setResponse] = useState<ApiResponse>()
  const [pageCounter, setPageCounter] = useState(1);
  const [userData, setUserData] = useState<UserData | null>(null);

  const [textValue, setTextValue] = useState('')
  const handleTextareaChange = (event:any) => {
    setTextValue(event.target.value);
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/Accounts/GetUserData`, {
          withCredentials: true,
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/Feedbacks/byProduct/${productId}?page=${pageCounter}&pageSize=5&sortField=createdAt&sortOrder=Asc`, {
          withCredentials: true
        });
        setReviews(response.data.data);
        setResponse(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [productId]);
  console.log(comments)
  const fetchComments = async (reviewId: number) => {
    try {
      const response = await axios.get(`http://localhost:8080/Comments/byFeedback/${reviewId}?page=1&pageSize=1000&sortField=createdAt&sortOrder=desc`, {
        withCredentials: true
      });
      setComments((prevComments) => ({
        ...prevComments,
        [reviewId]: response.data.data,
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchSubComments = async (commentId: number) => {
    try {
      const response = await axios.get(`http://localhost:8080/Comments/byComment/${commentId}?page=1&pageSize=1000&sortField=createdAt&sortOrder=Desc`, {
        withCredentials: true
      });
      setSubComments((prevSubComments) => ({
        ...prevSubComments,
        [commentId]: response.data.data,
      }));
    } catch (error) {
      console.error('Error fetching sub-comments:', error);
    }
  };
  const [rating, setRating] = useState(0); // Исходное значение оценки

  // Функция для установки оценки при щелчке на звезде
  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const submitReview = async () => {
    try {
      const reviewData = {
        id: 0,
        text: textValue,
        rating: rating,
        userId: userData?.id || "", // Assuming you have user data available
        productId: Number(productId)
      };
      const response = await axios.post(`http://localhost:8080/Feedbacks`, reviewData, {
        withCredentials: true
      });
      setTextValue('')
      setRating(0);
      toast('Отзыв успешно отправлен');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  const submitComment = async (reviewId: number) => {
    try {
      const reviewData = {
        id: 0,
        text: textValue,
        userId: userData?.id || "", // Assuming you have user data available
        productId: Number(productId),
        feedbackId: reviewId
      };
      const response = await axios.post(`http://localhost:8080/Comments`, reviewData, {
        withCredentials: true
      });
      setTextValue('')
      setRating(0);
      toast('Комментарий успешно отправлен');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  const submitSubComment = async (reviewId: number, parentId: number) => {
    try {
      const reviewData = {
        id: 0,
        text: textValue,
        userId: userData?.id || "", // Assuming you have user data available
        productId: Number(productId),
        parentCommentId: parentId,
        feedbackId: reviewId
      };
      const response = await axios.post(`http://localhost:8080/Comments`, reviewData, {
        withCredentials: true
      });
      setTextValue('')
      setRating(0);
      toast('Комментарий успешно отправлен');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  return (
    <div className="bg-white pt-10">
      <div>
        <div className="flex justify-between items-center pb-20 ">
          <h2 className="text-2xl ">Отзывы:</h2>
          <AlertDialog>
          <AlertDialogTrigger>
            <Button>Оставить отзыв</Button>
          </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Оставить отзыв</AlertDialogTitle>
              </AlertDialogHeader>
              <div>
              <p className="text-nowrap">Ваша оценка:</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((starRating) => (
                    <StarIcon
                        key={starRating}
                        className={starRating <= rating ? 'text-yellow-400' : 'text-gray-300'}
                        aria-hidden="true"
                        onClick={() => handleRatingClick(starRating)}
                        style={{cursor: 'pointer'}}
                    />
                ))}
                </div>
                </div>
                <Textarea onChange={handleTextareaChange} placeholder="Написать отзыв"/>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={submitReview}>Отправить</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="-my-10 pb-10">
          {reviews.map((review, reviewIdx) => (
            <div key={review.id} className="flex space-x-4 text-sm text-gray-500">
              <div className="flex-none py-10">
                <img src={review.user.avatar || 'https://via.placeholder.com/40'} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
              </div>
              <div className={classNames(reviewIdx === 0 ? '' : '', 'flex-1 py-10')}>
                <h3 className="font-medium text-gray-900">{`${review.user.name} ${review.user.surName} ${review.user.middleName}`}</h3>
                <p>
                  <time dateTime={review.createdAt}>{new Date(review.createdAt).toLocaleDateString()}</time>
                </p>

                <div className="mt-4 flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{review.rating} out of 5 stars</p>

                <div className="prose prose-sm mt-4 max-w-none text-gray-500">
                  {review.text}
                </div>
                <Accordion type="single" collapsible>
                  <AccordionItem value={`item-${review.id}`}>
                    <AccordionTrigger onClick={() => fetchComments(review.id)}>Комментарии </AccordionTrigger>

                    <AccordionContent>
                      <div className="grid w-full gap-2 pt-4 pb-10">
                        <Textarea onChange={handleTextareaChange} placeholder="Написать комментарий"/>
                        <Button onClick={() => submitComment(review.id)}>Отправить</Button>
                      </div>
                      {comments[review.id] ? (
                          comments[review.id].map((comment) => (
                              <div key={comment.id} className="flex space-x-4 text-sm text-gray-500">
                                <div className="flex-none py-2">
                                  <img src={comment.user.avatar || 'https://via.placeholder.com/40'} alt=""
                                       className="h-8 w-8 rounded-full bg-gray-100"/>
                                </div>
                                <div className="flex-1 py-2">
                                  <h4 className="font-medium text-gray-900">{`${comment.user.name} ${comment.user.surName} ${comment.user.middleName}`}</h4>
                                  <p>
                                    <time
                                        dateTime={comment.createdAt}>{new Date(comment.createdAt).toLocaleDateString()}</time>
                                  </p>
                                  <p className="mt-1">{comment.text}</p>
                                  <Accordion type="single" collapsible>
                                    <AccordionItem value={`sub-item-${comment.id}`}>
                                      <AlertDialog>
                                      <AlertDialogTrigger>
                                      <Button className='m-5 ml-0' variant={"outline"}>Ответить</Button>
                                      </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Ответ к комментарию</AlertDialogTitle>
                                          </AlertDialogHeader>
                                            <Textarea onChange={handleTextareaChange} placeholder="Написать комментарий"/>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                                            <AlertDialogAction onClick={ () => submitSubComment(review.id, comment.id)}>Отправить</AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                      {comment?.haveComments? (
                                          <>
                                          <AccordionTrigger
                                          onClick={() => fetchSubComments(comment.id)}>Ответы</AccordionTrigger>
                                      <AccordionContent>
                                        {subComments[comment.id] ? (
                                            subComments[comment.id].map((subComment) => (
                                                <div key={subComment.id}
                                                     className="flex space-x-4 text-sm text-gray-500 pl-6">
                                                  <div className="flex-none py-2">
                                                    <img
                                                        src={subComment.user.avatar || 'https://via.placeholder.com/40'}
                                                        alt="" className="h-8 w-8 rounded-full bg-gray-100"/>
                                                  </div>
                                                  <div className="flex-1 py-2">
                                                    <h4 className="font-medium text-gray-900">{`${subComment.user.name} ${subComment.user.surName} ${subComment.user.middleName}`}</h4>
                                                    <p>
                                                      <time
                                                          dateTime={subComment.createdAt}>{new Date(subComment.createdAt).toLocaleDateString()}</time>
                                                    </p>
                                                    <p className="mt-1">{subComment.text}</p>
                                                  </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Загрузка ответов...</p>
                                        )}
                                        <div className="grid w-full gap-2 pt-4">
                                          <Textarea onChange={handleTextareaChange} placeholder="Написать ответ"/>
                                          <Button onClick={ () => submitSubComment(review.id, comment.id)}>Отправить</Button>
                                        </div>
                                      </AccordionContent>
                                          </>
                                      ):''}
                                    </AccordionItem>
                                  </Accordion>
                                </div>
                              </div>
                          ))
                      ) : (
                          <p>Загрузка комментариев...</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          ))}
          {response?.hasNextPage? (
              <div  className="flex justify-center">
              <Button onClick={()=> {
                setPageCounter(pageCounter + 1);
                const loadfetchReviews = async () => {
                try {
                  const response = await axios.get(`http://localhost:8080/Feedbacks/byProduct/${productId}?page=${pageCounter}&pageSize=5&sortField=createdAt&sortOrder=desc`, {
                    withCredentials: true
                  });
                  setReviews([...reviews, ...response.data.data]);
                  setResponse(response.data);
                } catch (error) {
                  console.error('Error fetching reviews:', error);
                }
              };
                loadfetchReviews()
              }}>Показать ещё</Button>
                </div>
          ):''}
        </div>
      </div>
    </div>
  );
}

export default Reviews;