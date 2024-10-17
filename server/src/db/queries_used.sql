SELECT * FROM Cuenta WHERE nombre_usuario = ? AND contrasenia = ?;

-- order.controller
SELECT numero_pedido FROM Pedido ORDER BY id DESC LIMIT 1

-- Not used, but helps
SELECT * FROM Cuenta INNER JOIN Persona ON Cuenta.id_persona = Persona.id WHERE Persona.id = ?;