import { Router } from 'express';
import { signup, login } from '../controllers/authController';

const router = Router();

router.post('/signup', (req, res) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Register a new user'
    #swagger.description = 'Creates a Supabase Auth account and a matching record in public.users. Role defaults to student.'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: { email: 'user@handong.ac.kr', password: 'secret', name: 'Leo Ricardo', role: 'student' }
    }
    #swagger.responses[201] = { description: 'User registered successfully' }
    #swagger.responses[400] = { description: 'Missing fields or Supabase auth error' }
  */
  signup(req, res);
});

router.post('/login', (req, res) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Login and receive JWT'
    #swagger.description = 'Authenticates via Supabase Auth and returns access_token for use in Authorization: Bearer headers.'
    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: { email: 'user@handong.ac.kr', password: 'secret' }
    }
    #swagger.responses[200] = { description: 'Login successful, returns session tokens' }
    #swagger.responses[401] = { description: 'Invalid credentials' }
  */
  login(req, res);
});

export default router;
