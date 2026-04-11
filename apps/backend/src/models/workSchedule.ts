'use strict';

import { DataTypes, Model } from 'sequelize';

export default function WorkScheduleModel(sequelize: any) {
  class WorkSchedule extends Model {
    calcLateMinutes(actualCheckIn: Date, date: string): number {
      const checkInTime = this.getDataValue('check_in_time') as string;
      const toleranceMinutes = this.getDataValue('tolerance_minutes') as number;
      const scheduled = new Date(`${date}T${checkInTime}`);
      const deadline = new Date(scheduled.getTime() + toleranceMinutes * 60000);
      if (actualCheckIn <= deadline) return 0;
      return Math.floor((actualCheckIn.getTime() - deadline.getTime()) / 60000);
    }

    calcPenalty(lateMinutes: number): number {
      return lateMinutes * Number(this.getDataValue('penalty_per_minute'));
    }
  }

  WorkSchedule.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: true },
    },
    check_in_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    check_out_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    tolerance_minutes: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
    penalty_per_minute: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: { min: 0 },
    },
  }, {
    sequelize,
    modelName: 'WorkSchedule',
    tableName: 'work_schedules',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return WorkSchedule;
}