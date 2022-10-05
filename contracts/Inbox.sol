pragma solidity ^0.4.17;

contract Inbox {
    string public pesan;
    int public sum;

    function Inbox(string initialPesan) public {
        pesan = initialPesan;
    }

    function setPesan(string pesanBaru) public {
        pesan = pesanBaru;
    }

    function tambah(int a, int b) public {
        sum = a + b;
        
    }

}