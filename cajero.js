var cuentas = [
    { nombre: "Mali", saldo: 200, password: "pass1" },
    { nombre: "Gera", saldo: 290, password: "pass2" },
    { nombre: "Maui", saldo: 67, password: "pass3" }
  ];
  
  function verificar() {
    var seleccion = document.getElementById("cuentas");
    var password = document.getElementById("password").value;
    var cuentaSeleccionada = cuentas[seleccion.value];
  
    if (cuentaSeleccionada && password === cuentaSeleccionada.password) {
      localStorage.setItem("cuentaSeleccionada", JSON.stringify(cuentaSeleccionada));
      window.location.href = "opciones.html";
    } else {
      alert("Contraseña incorrecta. Inténtalo de nuevo.");
    }
  }
  
  function obtenerCuenta() {
    var cuenta = JSON.parse(localStorage.getItem("cuentaSeleccionada"));
    document.getElementById("nombreCuenta").innerText = "Usuario: " + cuenta.nombre;
  }
  
  function consultarSaldo() {
    obtenerCuenta();
    var cuenta = JSON.parse(localStorage.getItem("cuentaSeleccionada"));
    document.getElementById("saldo").innerText = "Saldo actual: $" + cuenta.saldo;
  }
  
  function ingresarMonto() {
    obtenerCuenta();
    var cuenta = JSON.parse(localStorage.getItem("cuentaSeleccionada"));
    var monto = parseFloat(prompt("Ingresa el monto a ingresar:"));
  
    if (!isNaN(monto) && monto > 0) {
      var saldoTotal = cuenta.saldo + monto;
      var limiteDeposito = 990 - cuenta.saldo;
    
      if (saldoTotal <= 990) {
        cuenta.saldo += monto;
        localStorage.setItem("cuentaSeleccionada", JSON.stringify(cuenta));
        consultarSaldo();
      } else {
        alert("La cuenta no debe tener más de $990. El máximo a depositar es $" + limiteDeposito);
      }
    } else {
      alert("Ingresa un monto válido");
    }
  }
  
  function retirarMonto() {
    obtenerCuenta();
    var cuenta = JSON.parse(localStorage.getItem("cuentaSeleccionada"));
    var monto = parseFloat(prompt("Ingresa el monto a retirar:"));
  
    if (!isNaN(monto) && monto > 0) {
      var saldoDespuesRetiro = cuenta.saldo - monto;
      var limiteMinimo = cuenta.saldo - 10; // Calcular el límite mínimo
  
      if (saldoDespuesRetiro >= 10) {
        cuenta.saldo -= monto;
        localStorage.setItem("cuentaSeleccionada", JSON.stringify(cuenta));
        consultarSaldo();
      } else {
        var maxRetiro = cuenta.saldo - 10; // Calcular el máximo permitido
        alert("La cuenta no puede tener menos de $10. El máximo a retirar es $" + maxRetiro);
      }
    } else {
      alert("Ingresa un monto válido.");
    }
  }

  function cerrarSesion() {
    localStorage.removeItem("cuentaSeleccionada");
    window.location.href = "index.html";
  }