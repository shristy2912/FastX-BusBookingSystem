create database fastX2
Use FastX2

CREATE TABLE [User] (
    UserID INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100) NOT NULL,
    Gender NVARCHAR(10),
    ContactNumber NVARCHAR(20),
    Address NVARCHAR(255),
    Email NVARCHAR(100) UNIQUE,
    Password NVARCHAR(255) NOT NULL,
	Role NVARCHAR(30) NOT NULL
);

CREATE TABLE BusOperator (
    BusOperatorID INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100) NOT NULL,
    Gender NVARCHAR(10),
    ContactNumber NVARCHAR(20),
    Address NVARCHAR(255),
    Email NVARCHAR(100) UNIQUE,
    Password NVARCHAR(255) NOT NULL,
	Role NVARCHAR(30) NOT NULL
);
CREATE TABLE Administrator (
    AdminID INT PRIMARY KEY IDENTITY,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    Password NVARCHAR(255) NOT NULL,
	Role NVARCHAR(30) NOT NULL
);
CREATE TABLE BusRoutes (
    RouteID INT IDENTITY(1,1) PRIMARY KEY,
    Origin NVARCHAR(100) NOT NULL,
    Destination NVARCHAR(100) NOT NULL,
    TravelDate DATE NOT NULL
);
CREATE TABLE Buses (
    BusID INT PRIMARY KEY IDENTITY,
    RouteID INT,
    OperatorID INT,
    BusName NVARCHAR(100),
    BusNumber NVARCHAR(20),
    SeatType NVARCHAR(20),
    BusType NVARCHAR(30),
    NumberOfSeats INT,
    PickUp NVARCHAR(100),
    DropPoint NVARCHAR(100),
    WaterBottle BIT,
    ChargingPoint BIT,
    TV BIT,
    Blanket BIT,
    FOREIGN KEY (RouteID) REFERENCES BusRoutes(RouteID) ON DELETE CASCADE On update cascade,
    FOREIGN KEY (OperatorID) REFERENCES BusOperator(BusOperatorID) ON DELETE CASCADE on update cascade 
);

CREATE TABLE BusSchedule (
    ScheduleID INT IDENTITY(1,1) PRIMARY KEY,
    BusID INT FOREIGN KEY REFERENCES Buses(BusID)  ON DELETE CASCADE ON UPDATE CASCADE,
    DepartureTime TIME NOT NULL,
    ArrivalTime TIME NOT NULL,
    Fare DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Seats (
    SeatID INT IDENTITY(1,1) PRIMARY KEY,
    BusID INT FOREIGN KEY REFERENCES Buses(BusID)  ON DELETE CASCADE ON UPDATE CASCADE,
    SeatNumber INT NOT NULL,
    IsAvailable BIT NOT NULL
);



CREATE TABLE Booking (
    BookingID INT IDENTITY(1,1) PRIMARY KEY,
    BusID INT FOREIGN KEY REFERENCES Buses(BusID) ON DELETE CASCADE ON UPDATE CASCADE,
    ScheduleId INT FOREIGN KEY REFERENCES BusSchedule(ScheduleID) ON DELETE NO ACTION ,
    UserID INT FOREIGN KEY REFERENCES [User](UserID) ON DELETE NO ACTION ,
    TotalSeats INT NOT NULL,
    SeatNumbers NVARCHAR(MAX) NOT NULL,
    TotalCost DECIMAL(10, 2) NOT NULL,
    BookingDate DATETIME DEFAULT GETDATE() NOT NULL
);


CREATE TABLE Payment (
    PaymentID INT IDENTITY(1,1) PRIMARY KEY,
    BookingID INT FOREIGN KEY REFERENCES Booking(BookingID) ON DELETE CASCADE ON UPDATE CASCADE,
    PaymentAmount DECIMAL(10, 2) NOT NULL,
    PaymentDate DATETIME DEFAULT GETDATE() NOT NULL,
    PaymentMethod NVARCHAR(50) NOT NULL,
    TransactionStatus NVARCHAR(100) NOT NULL
);


CREATE TABLE LoginTable (
    LoginId INT PRIMARY KEY IDENTITY,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Password NVARCHAR(50) NOT NULL,
    Role NVARCHAR(30) NOT NULL,
    BusOperatorID INT,
    UserID INT,
    AdminID INT,
    FOREIGN KEY (BusOperatorID) REFERENCES BusOperator(BusOperatorID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (UserID) REFERENCES [User](UserID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (AdminID) REFERENCES Administrator(AdminID) ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TRIGGER trg_User_Insert
ON [User]
AFTER INSERT
AS
BEGIN
    INSERT INTO LoginTable(Email, Password, Role,UserID)
    SELECT Email, Password, Role,UserID
    FROM inserted;
END;

CREATE TRIGGER trg_Operator_Insert
ON BusOperator
AFTER INSERT
AS
BEGIN
    INSERT INTO LoginTable (Email, Password, Role,BusOperatorID)
    SELECT Email, Password, Role,BusOperatorID
    FROM inserted;
END;



CREATE TRIGGER trg_Admin_Insert
ON Administrator
AFTER INSERT
AS
BEGIN
    INSERT INTO LoginTable (Email, Password, Role,AdminID)
    SELECT Email, Password, Role,AdminID
    FROM inserted;
END;





INSERT INTO BusRoutes (Origin, Destination, TravelDate)
VALUES 
       ('Mumbai', 'Nagpur', '2023-03-16');
INSERT INTO BusRoutes (Origin, Destination, TravelDate)
VALUES ('Delhi', 'Bhopal', '2023-03-15'),
       ('Delhi', 'Nagpur', '2023-03-16');

INSERT INTO Administrator  (Email, Password,Role)
VALUES ('prakash@gmail.com', 'prakash12','Admin'),
('la@gmail.com','prakash12','Admin'),
('l@gmail.com','a12','Admin'),
('shankar@gmail.com','shankar12','Admin'),
('sharan@gmail.com','sharan12','Admin'),
('jeeva@gmail.com','jeeva12','Admin')


INSERT INTO BusOperator (Name,Gender,ContactNumber,Address,Email,Password,Role)
VALUES('Shyam Joshi','Male','22334455','Andheri,Mumbai','shyam@gmail.com','shyam11','Operator'),
('Devi Prasad','Male','33445112','Ghatkopar,Mumbai','devi@gmail.com','devi11','Operator'),
('Diya Bharti','Female','78759495','Dwarka,Delhi','diya@gmail.com','diya11','Operator'),
('Aditi Mehta','Male','22399955','Mumbai,Maharashtra','kayal@gmail.com','kayal12','Operator'),
('kayal','Female','22399955','Karol Bagh,Delhi','aditi@gmail.com','aditi11','Operator')

INSERT INTO BusOperator (Name,Gender,ContactNumber,Address,Email,Password,Role)
VALUES('Saran','Male','22377455','Mumbai','sa@gmail.com','saran12','Operator')

Select * from Administrator
Select * from BusOperator
select*from Busroutes
select*from [user]


INSERT INTO Buses(RouteID,OperatorID,BusName,BusNumber,SeatType,BusType,NumberOfSeats,PickUp,DropPoint,WaterBottle,ChargingPoint,TV,Blanket)
VALUES
(2,6,'Neeta Travels','MH-02-66PP','Sleeper','AC',20,'Mumbai','Nagpur',0,1,1,0),
(3,4,'RajHans','DL-02-22R5','Chair','Non-Ac',30,'Delhi','Itarsi',0,1,1,0),
(3,3,'Neeta Travels','DL-02-22Y5','Chair','Non-AC',20,'Delhi','Bhopal',0,1,1,1),
(2,3,'Jeevan Travels','DL-02-11R5','Sleeper','Non-AC',20,'Dlehi','Nagpur',0,1,1,0)


select * from buses

INSERT INTO BusSchedule(BusID,DepartureTime,ArrivalTime,Fare)
VALUES(4,'11:00 PM','06:00 AM',1000)

INSERT INTO BusSchedule(BusID,DepartureTime,ArrivalTime,Fare)
VALUES
(6,'12:00 PM','8:00 PM',750),
(7,'09:00 AM','6:00 PM',750),
(6,'11:00 PM','6:00 AM',1000)

INSERT INTO Seats(BusId,SeatNumber,IsAvailable)
VALUES(6,1,1),(6,2,1),(6,3,1),(6,4,1),(6,5,1),(6,6,1),(6,7,1),(6,8,1),(6,9,1),(6,10,1),(6,11,1),(6,12,1),(6,13,1),(6,14,1),(6,15,1),(6,16,1),(6,17,1),(6,18,1),(6,19,1),(6,20,1)


INSERT INTO Seats(BusId,SeatNumber,IsAvailable)
VALUES(7,1,1),(7,2,0),(7,3,0),(7,4,1),(7,5,0),(7,6,1),(7,7,0),(7,8,0),(7,9,1),(7,10,1),(7,11,1),(7,12,1),(7,13,1),(7,14,1),(7,15,1),(7,16,1),(7,17,1),(7,18,1),(7,19,1),(7,20,1)

INSERT INTO Seats(BusId,SeatNumber,IsAvailable)
VALUES(8,1,1),(8,2,1),(8,3,1),(8,4,1),(8,5,1),(8,6,1),(8,7,1),(8,8,1),(8,9,1),(8,10,1),(8,11,1),(8,12,1),(8,13,1),(8,14,1),(8,15,1),(8,16,1),(8,17,1),(8,18,1),(8,19,1),(8,20,1)



select*from BusOperator
select*from Administrator

select*from BusRoutes

select*from [User]
select*from Seats
select*from BusSchedule
select*from Booking
select*from LoginTable
select*from Payment
select*from buses

update buses set PickUp='Delhi' where BusID=4

insert into Booking (BusID,ScheduleId,UserID,TotalSeats,SeatNumbers,TotalCost,BookingDate) values
(1,1,1,1,'2',500,'2020-09-09'),
(2,2,20,1,'9',200,'2024-01-10')


DELETE FROM Buses WHERE OperatorID IN (SELECT BusOperatorID FROM BusOperator);
DELETE FROM LoginTable WHERE BusOperatorID IN (SELECT BusOperatorID FROM BusOperator);












