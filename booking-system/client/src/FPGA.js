import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";

const FPGA = () => {

  let navigate = useNavigate();

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => navigate("/home")}
        startIcon={ <ArrowLeftIcon /> }
      >
        Back
      </Button>

      <Grid container
        spacing={3}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "50px",
        }}
      >
        <Grid item xs={8}
          sx={{
            minWidth: "800px"
          }}
        >
          <h2>Before your booking:</h2><br/>
          You can prep your design for remote debugging by adding a Virtual IO IP core to it. This allows you to use a virtual panel in Vivado to simulate hardware inputs like push buttons and switches. <b>IF YOU ARE ONLY USING UART, YOU CAN SKIP THE INSTRUCTIONS BELOW.</b><br/><br/>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
            >
              The following instructions describes how you could add VIO core manually to your design.
            </AccordionSummary>

            <AccordionDetails>
              <ol>
                <li>Add VIO core to your project:</li>
                  <ul>
                    <br/>
                    <li>Click on <b>IP Catalog</b> in <b>Project Manager</b> tab in Vivado</li>
                    <br/>
                    <img src={require('./images/fpga/ip_catalog.png')} height={400}/>
                    <br/>
                    <br/>

                    <li>Search for "VIO" in the IP catalog</li>
                    <br/>
                    <img src={require('./images/fpga/vio_in_catalog.png')} height={400}/>
                    <br/>
                    <br/>

                    <li>Configure the VIO core accordingly.</li>
                    <br/>
                    <b>Input Probe Count</b> = Number of outputs to your design that you want to virtualize<br/>
                    <b>Output Probe Count</b> = Number of inputs to your design that you want to virtualize<br/>
                    Change the Probe Widths per port accordingly in <b>PROBE_IN Ports</b> and <b>PROBE_OUT Ports</b>
                    <br/>
                    <br/>
                    eg. Design uses 16 LED, AN, CAT and 16 Switches: <br/>
                    <b>Input Probe Count</b> = 3<br/>
                    <b>Output Probe Count</b> = 1<br/><br/>

                    <b>PROBE_IN0</b> = 16 (16 LEDs)<br/>
                    <b>PROBE_IN1</b> = 4 (4 Anode)<br/>
                    <b>PROBE_IN2</b> = 7 (Cathode)<br/><br/>

                    <b>PROBE_OUT0</b> = 16 (16 SW)<br/><br/>

                    <img src={require('./images/fpga/vio_port_config.png')} height={400}/>
                    <br/>
                    <br/>
                  </ul>

                <li>Click on <b>Ok > Generate</b></li>
                <br/>
                <li>Wire VIO Core to your project</li>
                  <ul>
                    <li>Example wrapper file to wire the IP core to your top file</li>
                    <br/>
                    <img src={require('./images/fpga/vio_wrapper.png')} height={400}/>
                    <br/>
                    <li>Alternatively, you could package your design as an IP as seen <a href="https://wiki.nus.edu.sg/display/ee4218/Packaging+the+Coprocessor+as+an+IP">here</a></li>
                  </ul>
                <br/>
                <li>The VIO IP is successfully integrated to your design, generate bitstream</li>
              </ol>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
            >
              Alternatively, you could use our script to automatically add the VIO core to your design.
            </AccordionSummary>

            <AccordionDetails>
              <b>Please do not download and run the script blindly, read below and understand what the script does.</b>
              <ol>
                <li>Add Vivado to path and run <code>settings64.sh</code>/<code>settings64.bat</code> in <code>Vivado/[VERSION]</code> directory</li>
                <li>Download the folder <a>here</a></li>
                <li>Extract the contents of the zip folder into your project root like this:</li><br/>
                <img src={require('./images/fpga/zip_contents.png')} height={400}/>
                <br/>
                <br/>
                <li>Download this folder <a>here</a></li>
                <li>Extract the contents of the zip folder into your project root like this:</li>
                <img src="test" height={400}/>
                <li>Open terminal in your project root and run <code>vivado -mode batch -source init.tcl</code></li>
                <li>The script will:</li>
                  <ul>
                    <li>Add the VIO core to your project</li>
                    <li>Add a Wrapper file that connects to Top.v and the VIO core</li>
                    <li>Disables the current constraint file and adds a new constraint file compatible with the VIO core</li>
                  </ul>
                <li>Once the script is complete, you can generate bitstream and continue with the instructions below</li>
              </ol>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={8}
          sx={{
            minWidth: "800px"
          }}
        >
          <h2>During your booking:</h2>
          <br/>
          <ol>
            <li>Open a terminal and run <code>SSH -L 1234:localhost:3121 fpgaws2.panicker.in</code> for Vivado</li>
            <li>Open a terminal and run <code>SSH -L 1235:localhost:3122 fpgaws2.panicker.in</code> for Console</li>

            <li>On Vivado, <b>Generate bitstream > Open Hardware Manager > Open Target > Open new Target... > Next</b></li>
            <li>Configure the target as shown in the image below:</li>
            <br/>
            <img src={require('./images/fpga/vivado_hw_target.png')} height={400}/>
            <br/>
            <br/>
            <li>If you or your group members have booked the system, you would be able to access the FPGA and can perform your normal workflow.</li>
            <br/>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                >
                  If you are using UART:
                </AccordionSummary>

                <AccordionDetails>
                  <ul>
                    <li>RealTerm is a terminal program specially designed for capturing and sending data through various protocols (UART, Raw TCP sockets etc). The purpose is similar to that of TeraTerm or PuTTY or GTKTerm or Serial Monitor (Arduino), but RealTerm is WAAY more feature-rich than any other serial console program.</li>
                    <li>Change <b>Port</b> to <b>1235</b>, and select <b>Raw</b> for <b>Winsock</b>, change the <b>Baud</b> rate to <b>115200</b></li>
                    <img src="test" height={400}/>

                    <li>Click on <b>Open</b> to open the port. The status on the right should be green or gray, not red.</li>

                    <li><b>Few notes on the usage of RealTerm</b></li>
                    <ul>
                      <li>Sending bytes using RealTerm: Click on the <b>Send</b> tab, type a number and click <b>Send Numbers/Send ASCII</b>. If you input, say 20 there and press <b>Send Numbers</b>, it will send 0x14. You can also enter directly as hexadecimal 0x14 and press <b>Send Numbers</b>.</li>
                      <img src="test" height={400}/>

                      <li>You can also use escape sequences (special characters) such as \r, \n etc.</li>
                      <img src="test" height={400}/>

                      <li>Sending text file contents using RealTerm: Specify the file in the <b>Dump File to Port</b> and click <b>Send File</b>.</li>
                      <img src="test" height={400}/>

                      <li>Capturing data into a file using RealTerm: Click on <b>Capture</b> tab and specify the file where you want the output to be saved. Click on <b>Start Overwrite</b>.  Check the <b>Display</b> option (available only in the newer versions) if you wish to see the data that is getting captured.</li>
                      <img src="test" height={400}/>
                    </ul>
                  </ul>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                >
                  If you are using VIO:
                </AccordionSummary>

                <AccordionDetails>
                  <ul>
                    <li>You will be greeted with a VIO panel as shown below</li>
                    <br/>
                    <img src={require('./images/fpga/vio_panel.png')} height={400}/>
                    <br/>
                    <br/>
                    <li>You can then add the inputs and outputs you want to observe via the <b>+</b> icon on the top</li>
                    <br/>
                    <img src={require('./images/fpga/vio_panel_buttons.png')} height={400}/>
                    <br/>
                    <br/>
                    <li>You can click on the buttons or change the values of switches using the panel and observe the outputs</li>
                  </ul>
                </AccordionDetails>
              </Accordion>
            </ol>
          </Grid>
        </Grid>
      </div>
  );
};

export default FPGA;
