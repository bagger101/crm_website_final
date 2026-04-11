'use strict';

import { DataTypes, Model } from 'sequelize';

export default function PasswordResetTokenModel(sequelize: any) {
  class PasswordResetToken extends Model {
    isExpired(): boolean {
      return new Date() > (this.getDataValue('expires_at') as Date);
    }

    isValid(): boolean {
      return !this.getDataValue('used_at') && !this.isExpired();
    }
  }

  PasswordResetToken.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    token_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    used_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'PasswordResetToken',
    tableName: 'password_reset_tokens',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });

  return PasswordResetToken;
}