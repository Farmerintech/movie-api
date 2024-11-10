Solution to the movie api assignment.

challenges:

deleting review passing the movieId and reviewId as parameter and must either be an admin that can delete or the reviewer himself. This give me some tough time till I discover I can actually search throug a collection with more than one argument. so what i did was verify if the movie whose id is passed even exist at all, then check if there is any review for that movie that matches the reviewId passed. if the criteria is meant then grant admin access to be able to delete or try to make sure if the person that droped the review is the one trying to delte, if not. deny access to delete.