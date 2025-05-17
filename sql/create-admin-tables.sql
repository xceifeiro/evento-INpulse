-- Criar tabela de usuários administradores
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'editor',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar políticas de segurança para a tabela admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura apenas para usuários autenticados
CREATE POLICY "Usuários autenticados podem ler admin_users"
  ON admin_users FOR SELECT
  USING (auth.role() = 'authenticated');

-- Política para permitir inserção apenas para superadmins
CREATE POLICY "Apenas superadmins podem inserir em admin_users"
  ON admin_users FOR INSERT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid() AND role = 'superadmin'
    )
  );

-- Política para permitir atualização apenas para superadmins
CREATE POLICY "Apenas superadmins podem atualizar admin_users"
  ON admin_users FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid() AND role = 'superadmin'
    )
  );

-- Política para permitir exclusão apenas para superadmins
CREATE POLICY "Apenas superadmins podem excluir de admin_users"
  ON admin_users FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid() AND role = 'superadmin'
    )
  );

-- Inserir um usuário superadmin inicial (substitua o UUID pelo ID do seu usuário)
-- Você precisará criar este usuário primeiro via interface ou API do Supabase
-- INSERT INTO admin_users (user_id, role) VALUES ('SEU_USER_ID_AQUI', 'superadmin');
