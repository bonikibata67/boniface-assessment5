
USE Assessment;
GO
CREATE OR ALTER PROCEDURE getPaginatedProducts(
    @PageNumber INT,
    @RowsPerPage INT
)
AS
BEGIN
    DECLARE @Offset INT;
    SET @Offset = (@PageNumber - 1) * @RowsPerPage;

    SELECT * FROM PRODUCTS
    ORDER BY Name
    OFFSET @Offset ROWS
    FETCH NEXT @RowsPerPage ROWS ONLY;
END;
GO
