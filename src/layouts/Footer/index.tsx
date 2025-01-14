import { Container } from "@/components/Container";
import React from "react";

export function Footer() {
  return (
    <footer>
      <Container>
        <hr />
        <div className="mt-16 mb-8 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Readers.</p>
        </div>
      </Container>
    </footer>
  );
}
