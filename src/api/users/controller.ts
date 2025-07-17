import { Request, Response } from 'express';
import prisma from '../../db/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../../middleware/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password are required' });

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(409).json({ error: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashed },
    });

    return res.status(201).json({ id: user.id, email: user.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateWebhook = async (req: AuthRequest, res: Response) => {
  const { webhookUrl } = req.body;
  const userId = req.userId;

  if (!userId || !webhookUrl) {
    return res.status(400).json({ error: 'Missing webhook URL' });
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { webhookUrl },
    });

    return res
      .status(200)
      .json({ message: 'Webhook updated', webhookUrl: user.webhookUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to update webhook' });
  }
};
