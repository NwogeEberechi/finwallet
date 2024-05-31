import { validationResult, param, body } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateUserId = [
  param("userId").isUUID().withMessage("Invalid UUID format for userId"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateAmount = [
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateWalletId = [
  body("senderWalletId")
  .notEmpty().withMessage('No sender wallet id provided.')
    .isUUID()
    .withMessage("Invalid UUID format for senderWalletId"),
  body("recipientWalletId")
  .notEmpty().withMessage('No recipient wallet id provided.')
    .isUUID()
    .withMessage("Invalid UUID format for recipientWalletId"),
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateAuth = [
    body('username')
      .notEmpty().withMessage('Username is required.')
      .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
    body('password')
      .notEmpty().withMessage('Password is required.')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
