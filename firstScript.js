function toggleSidebar(){
  document.getElementById("sidebar").classList.toggle('active');
  document.getElementById("menuBtn").classList.toggle('active');
}

function closeSidebar() {
	document.getElementById("sidebar").classList.remove('active');
}