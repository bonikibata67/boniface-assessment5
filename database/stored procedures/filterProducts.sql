USE Assessment;
GO

CREATE OR ALTER PROCEDURE filterProducts(
    @MinPrice DECIMAL(10, 2),
    @MaxPrice DECIMAL(10, 2),
    @Name VARCHAR(255) = NULL
)
AS
BEGIN
    SELECT * FROM PRODUCTS
    WHERE Price BETWEEN @MinPrice AND @MaxPrice
    AND (@Name IS NULL OR Name LIKE '%' + @Name + '%')
END;
