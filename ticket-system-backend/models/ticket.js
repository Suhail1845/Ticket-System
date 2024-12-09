module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define('Ticket', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      solvedAt: {
        type: DataTypes.DATE,
      },
    }, {
      timestamps: false, // Make sure timestamps is set to false
    });
  
    return Ticket;
  };
  