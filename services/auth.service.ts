'use server';

import { userRepository } from '@/repositories/user.repository';
import bcrypt from 'bcryptjs';
// Removed: import { encryptSSN } from '@/util/encrypt';
import type { userRegister } from '@/app/auth/signup/page';

export async function registerUser(data: userRegister) {
  const {
    name,
    email,
    phone,
    homeAddress,
    role,
    password,
    confirmPassword,
  } = data;


  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  // 2. Security
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. (Ensure ssn is removed from your Repository Schema too!)
  const user = await userRepository.create({
    name,
    email,
    phone,
    homeAddress,
    role,
    password: hashedPassword,
  });

  // 4. Return safe DTO
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}