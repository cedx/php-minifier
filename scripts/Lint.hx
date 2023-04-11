/** Performs the static analysis of source code. **/
function main()
	Sys.command("lix run checkstyle --config etc/checkstyle.json --exitcode --source scripts --source src --source test");
