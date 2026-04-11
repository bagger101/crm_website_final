'use strict';

import { DataTypes, Model } from 'sequelize';

export default function LeaveRequestModel(sequelize: any) {
  class LeaveRequest extends Model {
    get isPending(): boolean { return this.getDataValue('status') === 'pending'; }
    get isApproved(): boolean { return this.getDataValue('status') === 'approved'; }
    get isDeclined(): boolean { return this.getDataValue('status') === 'declined'; }
  }

  LeaveRequest.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    leave_type_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isAfterStart(this: any, value: string) {
          if (value < this.getDataValue('start_date')) {
            throw new Error('end_date tidak boleh sebelum start_date');
          }
        },
      },
    },
    total_days: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: { min: 1 },
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'declined', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
    approved_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    approved_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    decline_reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'LeaveRequest',
    tableName: 'leave_requests',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    scopes: {
      pending: { where: { status: 'pending' } },
      approved: { where: { status: 'approved' } },
      byEmployee: (employeeId: string) => ({ where: { employee_id: employeeId } }),
    },
  });

  return LeaveRequest;
}