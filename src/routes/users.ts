import { Request, Response, Router } from 'express';
import Comment from '../entities/Comment';
import Post from '../entities/Post';
import User from '../entities/User';
import user from '../middleware/user';

const getUserSubmissions = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const user = await User.findOneOrFail(
      { username: username },
      { select: ['createdAt', 'username'] }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    const posts = await Post.find({
      relations: ['comments', 'votes', 'sub'],
      where: { user },
    });
    const comments = await Comment.find({
      where: { user },
      relations: ['post'],
    });

    if (res.locals.user) {
      posts.forEach((p) => p.setUserVote(res.locals.user));
      comments.forEach((c) => c.setUserVote(res.locals.user));
    }

    let submissions: any[] = [];
    posts.forEach((p) => submissions.push({ type: 'Post', ...p.toJSON() }));
    comments.forEach((c) =>
      submissions.push({ type: 'Comment', ...c.toJSON() })
    );

    submissions.sort((a, b) => {
      if (b.createdAt > a.createdAt) return 1;
      if (b.createdAt < a.createdAt) return -1;
      return 0;
    });

    return res.json({ user, submissions });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const router = Router();

router.get('/:username', user, getUserSubmissions);

export default router;
