      program xif
      implicit none
      real :: x
      real, parameter :: x1 = 0.3, x2 = 0.6
      call random_seed()
      call random_number(x)
      if (x < x1) then
         print*,x,"<",x1
      else if (x < x2) then
         print*,x,"<",x2
      else
         print*,x,">=",x2
      end if
      end program xif

      FUNCTION func_name(a, b)
      INTEGER :: func_name
      INTEGER :: a
      REAL    :: b
      func_name = (2*a)+b
      RETURN
      END FUNCTION
      
      PROGRAM cows
      IMPLICIT NONE
      INTEGER :: func_name
      PRINT *,func_name(2, 1.3)
      END PROGRAM

      subroutine square_cube(i,isquare,icube)
      integer, intent(in)  :: i ! input
      integer, intent(out) :: isquare,icube ! output
      isquare = i**2
      icube   = i**3
      end subroutine square_cube
      
      program xx
      implicit none
      integer :: i,isq,icub
      i = 4
      call square_cube(i,isq,icub)
      print*,"i,i^2,i^3=",i,isq,icub
      end program xx

      INTEGER          :: x
      IF (x < 50) THEN
         Grade = 'F'
      ELSE IF (x < 60) THEN
         Grade = 'D'
      ELSE IF (x < 70) THEN
         Grade = 'C'
      ELSE IF (x < 80) THEN
         Grade = 'B'
      ELSE
         Grade = 'A'
      END IF