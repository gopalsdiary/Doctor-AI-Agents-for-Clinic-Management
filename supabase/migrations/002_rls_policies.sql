-- RLS Policies

-- Clinics
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own clinics" ON clinics
  FOR ALL USING (auth.uid() = user_id);

-- Patients
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage patients in their clinics" ON patients
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM clinics
      WHERE clinics.id = patients.clinic_id
      AND clinics.user_id = auth.uid()
    )
  );

-- Services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage services in their clinics" ON services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM clinics
      WHERE clinics.id = services.clinic_id
      AND clinics.user_id = auth.uid()
    )
  );

-- Appointments
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage appointments in their clinics" ON appointments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM clinics
      WHERE clinics.id = appointments.clinic_id
      AND clinics.user_id = auth.uid()
    )
  );

-- AI Settings
ALTER TABLE ai_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage AI settings for their clinics" ON ai_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM clinics
      WHERE clinics.id = ai_settings.clinic_id
      AND clinics.user_id = auth.uid()
    )
  );

-- Invoices
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view invoices for their clinics" ON invoices
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM clinics
      WHERE clinics.id = invoices.clinic_id
      AND clinics.user_id = auth.uid()
    )
  );
