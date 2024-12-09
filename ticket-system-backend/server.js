const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const db = require("./models");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const Ticket = db.Ticket;

// Create Ticket
app.post("/tickets", async (req, res) => {
    try {
        const ticket = await Ticket.create(req.body);
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read Tickets
app.get("/tickets", async (req, res) => {
    try {
        const tickets = await Ticket.findAll();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Ticket
app.put('/tickets/:id', async (req, res) => {
    const { id } = req.params;
    const { status, solvedAt } = req.body;
  
    try {
      const ticket = await Ticket.findByPk(id);
  
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      // Update only the desired fields (status and solvedAt)
      ticket.status = status;
      ticket.solvedAt = solvedAt;
  
      // Use save method and specify which fields to update
      await ticket.save({
        fields: ['status', 'solvedAt'], // Only update the fields you want
      });
  
      res.json(ticket);
    } catch (error) {
      console.error("Error updating ticket:", error);
      res.status(500).json({ message: 'Failed to update ticket' });
    }
  });
  
  
// Delete Ticket
app.delete("/tickets/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Ticket.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: "Ticket deleted successfully" });
        } else {
            throw new Error("Ticket not found");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    await db.sequelize.sync();
});

// Example of using the Ticket model
Ticket.findAll().then(tickets => {
    console.log(tickets);
  });
