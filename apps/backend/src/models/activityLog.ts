'use strict';

import { DataTypes, Model } from 'sequelize';

export default function ActivityLogModel(sequelize: any) {
  class ActivityLog extends Model {
    static async record(
      actorId: string,
      action: string,
      targetType: string | null = null,
      targetId: string | null = null,
      payload: object | null = null,
      ipAddress: string | null = null,
    ) {
      return ActivityLog.create({
        actor_id: actorId,
        action,
        target_type: targetType,
        target_id: targetId,
        payload,
        ip_address: ipAddress,
      });
    }
  }

  ActivityLog.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    actor_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    target_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    target_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    payload: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'ActivityLog',
    tableName: 'activity_logs',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    scopes: {
      byActor: (actorId: string) => ({ where: { actor_id: actorId } }),
      byAction: (action: string) => ({ where: { action } }),
      byTarget: (type: string, id: string) => ({ where: { target_type: type, target_id: id } }),
    },
  });

  return ActivityLog;
}