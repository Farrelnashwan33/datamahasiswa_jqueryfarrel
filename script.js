// Class Mahasiswa untuk OOP
class Mahasiswa {
    constructor(nama, umur, jurusan) {
        this.nama = nama;
        this.umur = umur;
        this.jurusan = jurusan;
    }
}

$(document).ready(function () {
    // Mengambil data mahasiswa dari Local Storage
    let mahasiswaData = JSON.parse(localStorage.getItem("mahasiswa")) || [];

    // Fungsi untuk menampilkan data mahasiswa
    function renderData() {
        $("#mahasiswa-list").empty();
        mahasiswaData.forEach((mhs, index) => {
            $("#mahasiswa-list").append(`
                <tr>
                    <td>${mhs.nama}</td>
                    <td>${mhs.umur}</td>
                    <td>${mhs.jurusan}</td>
                    <td>
                        <button class="edit-btn" data-index="${index}">Edit</button>
                        <button class="delete-btn" data-index="${index}">Hapus</button>
                    </td>
                </tr>
            `);
        });
    }

    // Menambah mahasiswa baru
    $("#tambah").click(function () {
        const nama = $("#nama").val();
        const umur = $("#umur").val();
        const jurusan = $("#jurusan").val();

        if (nama && umur && jurusan) {
            const newMahasiswa = new Mahasiswa(nama, umur, jurusan);
            mahasiswaData.push(newMahasiswa);
            localStorage.setItem("mahasiswa", JSON.stringify(mahasiswaData));
            renderData();
            $("#nama").val("");
            $("#umur").val("");
            $("#jurusan").val("");
        } else {
            alert("maaf data tidak bisa ditambahkan karena blm ada isinya!");
        }
    });

    // Edit data mahasiswa
    $(document).on("click", ".edit-btn", function () {
        const index = $(this).data("index");
        const mhs = mahasiswaData[index];
        $("#nama").val(mhs.nama);
        $("#umur").val(mhs.umur);
        $("#jurusan").val(mhs.jurusan);
        mahasiswaData.splice(index, 1); // Hapus sementara untuk update
        localStorage.setItem("mahasiswa", JSON.stringify(mahasiswaData));
    });

    // Hapus data mahasiswa
    $(document).on("click", ".delete-btn", function () {
        const index = $(this).data("index");
        mahasiswaData.splice(index, 1);
        localStorage.setItem("mahasiswa", JSON.stringify(mahasiswaData));
        renderData();
    });

    // Search mahasiswa
    $("#search").keyup(function () {
        const searchTerm = $(this).val().toLowerCase();
        const filteredData = mahasiswaData.filter(mhs => 
            mhs.nama.toLowerCase().includes(searchTerm) ||
            mhs.umur.toString().includes(searchTerm) ||
            mhs.jurusan.toLowerCase().includes(searchTerm)
        );
        $("#mahasiswa-list").empty();
        filteredData.forEach((mhs, index) => {
            $("#mahasiswa-list").append(`
                <tr>
                    <td>${mhs.nama}</td>
                    <td>${mhs.umur}</td>
                    <td>${mhs.jurusan}</td>
                    <td>
                        <button class="edit-btn" data-index="${index}">Edit</button>
                        <button class="delete-btn" data-index="${index}">Hapus</button>
                    </td>
                </tr>
            `);
        });
    });

    // Render data awal
    renderData();
});
