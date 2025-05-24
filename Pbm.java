import java.util.*;
import java.io.*;
class Main{
    public static void main(String[] args){
        int n=5;
        int[] arr={11,22,4,53,66,24};
        int count=0;
        for(int i=0;i<5;i++){
            int num=arr[i];
            String bin=Integer.toBinaryString(num);
            StringBuilder sb=new StringBuilder(bin);
            String reverse=sb.reverse().toString();
            if(bin.equals(reverse)){
                System.out.print(arr[i]+" ");
                count++;
            }
           
        }
        if(count==0){
            System.out.println("-1");
        }
    }
}